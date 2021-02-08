from rest_framework.decorators import api_view
from rest_framework.response import Response

from api.models import Product
from api.serializers import ProductSerializer


@api_view(["GET", "POST", "DELETE"])
def get_routes(request):
    return Response("Hello, world!")


@api_view(["GET", "POST", "DELETE"])
def get_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def get_product(request, pk):
    product = Product.objects.get(id=pk)
    serializer = ProductSerializer(product)
    return Response(serializer.data)
