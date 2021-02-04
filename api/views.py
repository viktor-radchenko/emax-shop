from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .products_data import products


@api_view(["GET", "POST", "DELETE"])
def get_routes(request):
    return Response("Hello, world!")


@api_view(["GET", "POST", "DELETE"])
def get_products(request):
    return Response(products)


@api_view(["GET"])
def get_product(request, pk):
    for product in products:
        if product["_id"] == pk:
            return Response(product)