from django.http import HttpResponse
from django.shortcuts import render
from google.cloud import datastore
import json

# Create your views here.\
def view_wallet(request):

    # Make a call to Google Cloud Datastore
    datastore_client = datastore.Client(project='cryptowalletmanager')
    kind = 'WalletHistory'

    q = datastore_client.query(kind=kind, order=['-Timestamp'])
    r = q.fetch(limit=1)

    for data in r:
        wallet_entity = data
        print(data)

    wallet_summary = {}

    if wallet_entity is not None:
        wallet_summary['USD'] = wallet_entity['TotalUSD']
        wallet_summary['BTC'] = wallet_entity['TotalBTC']

        # coin_summaries = {}
        # exchange_summaries = {}
        # exchange_details = wallet_summary['ExchangeDetails']
        # for exhange_name in exchange_details.keys():
        #     e_data = exchange_details[exhange_name]
        #     e_summary = {'USD': e_data['TotalUSD'], 'BTC': e_data['TotalBTC']}
        #     exchange_summaries[exhange_name] = e_summary
        #
        #     coin_details = exchange_details

    return HttpResponse(json.dumps(wallet_summary))
