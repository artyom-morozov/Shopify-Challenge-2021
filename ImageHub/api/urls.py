from django.urls import path, include
from . import views

urlpatterns = [
    path('items', views.ItemListView.as_view()),
    path('create-item/', views.CreateItemView.as_view()),
    # authentication views
    # path('accounts/', include('rest_registration.api.urls')),
    path('csrf/', views.get_csrf, name='api-csrf'),
    path('login/', views.login_view, name='api-login'),
    path('logout/', views.logout_view, name='api-logout'),
    path('session/', views.SessionView.as_view(), name='api-session'),  
    path('whoami/', views.WhoAmIView.as_view(), name='api-whoami'),
]
