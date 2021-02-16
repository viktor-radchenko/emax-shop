from django.urls import path
from api import views


urlpatterns = [
    path('', views.get_products, name='products'),
    path('<str:pk>/', views.get_product, name='product'),
]
