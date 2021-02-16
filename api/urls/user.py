from django.urls import path
from api import views


urlpatterns = [
    path('profile/', views.get_user_profile, name='profile'),
    path('all/', views.get_all_users, name='user_list'),
]
