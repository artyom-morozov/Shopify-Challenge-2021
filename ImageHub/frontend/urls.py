from django.urls import path
from .views import index
urlpatterns = [
    path('', index),
    path('sell', index),
    path('cart', index),
    path('login', index),
    path('register', index),
]
