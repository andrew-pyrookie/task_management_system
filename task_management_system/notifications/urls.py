from django.urls import path
from .views import NotificationListView, NotificationSettingView

urlpatterns = [
    path('notifications/', NotificationListView.as_view(), name='notifications-list'),
    path('notification-settings/', NotificationSettingView.as_view(), name='notification-settings'),
]
