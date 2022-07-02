from api.views import MessageViewSet
from django.contrib import admin
from django.urls import include, path
from rest_framework import routers

router = routers.DefaultRouter()
router.register("messages", MessageViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
