from django.http import HttpResponse
from django.shortcuts import render


# Create your views here.\
def view_wallet(request):
    return HttpResponse('{"message": "Json Response!"}')
