import json

from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.middleware.csrf import get_token
from django.views.decorators.http import require_POST
from django.http import HttpResponse, JsonResponse

from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import ParseError
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated

from .serializers import ItemSerializer, CreateItemSerializer
from .models import Item

# Authentication views 
def get_csrf(request):
    response = JsonResponse({'detail': 'CSRF cookie set'})
    response['X-CSRFToken'] = get_token(request)
    return response


@require_POST
def login_view(request):
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')

    if username is None or password is None:
        return JsonResponse({'detail': 'Please provide username and password.'}, status=400)

    user = authenticate(username=username, password=password)

    if user is None:
        return JsonResponse({'detail': 'Invalid credentials.'}, status=400)

    login(request, user)
    return JsonResponse({'detail': 'Successfully logged in.'})


def logout_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'detail': 'You\'re not logged in.'}, status=400)

    logout(request)
    return JsonResponse({'detail': 'Successfully logged out.'})


class SessionView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    @staticmethod
    def get(request, format=None):
        return JsonResponse({'isAuthenticated': True})


class WhoAmIView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    @staticmethod
    def get(request, format=None):
        return JsonResponse({'username': request.user.username})






# File Upload API
# class FileUploadView(APIView):
#     parser_class = (FileUploadParser,)

#     def put(self, request, format=None):
#         if 'file' not in request.data:
#             raise ParseError("Empty content")

#         f = request.data['file']
        
#         Item.image.save(f.name, f, save=True)
#         return Response(status=status.HTTP_201_CREATED)

# Item Operations
class ItemListView(generics.ListCreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

class CreateItemView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    parser_class = (MultiPartParser, FormParser)

    def post(self, request, format=None):
        print('request', request.data)
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        # Check if file is there
        if 'image' not in request.data:
            raise ParseError("Empty content")
        
        uploadedFile = request.data['image']

        print('file uploaded ',uploadedFile.name)

        serializer = CreateItemSerializer(data=request.data)
        
        print('test')
        if serializer.is_valid():
            print('is valid')
            name = serializer.data.get('name')
            
            price = serializer.data.get('price')
            discount_price = serializer.data.get('discount_price')
            description = "" if not serializer.data.get('description') else serializer.data.get('description')
            user = self.request.user
            queryset = Item.objects.filter(user=user, name=name)
            if queryset.exists():
                item = queryset[0]
                item.price = price
                item.discount_price = discount_price
                item.save(update_fields=['price', 'discount_price'])
                return Response(ItemSerializer(item).data, status=status.HTTP_200_OK)
            else:
                item = Item(user=request.user, name=name,
                            price=price, discount_price=discount_price, description=description)
                item.image.save(uploadedFile.name, uploadedFile, save=True)
                item.save()
                return Response(ItemSerializer(item).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)