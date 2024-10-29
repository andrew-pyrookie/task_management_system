# views.py
from rest_framework import viewsets
from rest_framework.response import Response
from .models import Project
from .serializers import ProjectSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def add_collaborator(self, request, pk):
        project = self.get_object()
        user_id = request.data.get('user_id')
        project.collaborators.add(user_id)
        return Response({'status': 'collaborator added'})

    def remove_collaborator(self, request, pk):
        project = self.get_object()
        user_id = request.data.get('user_id')
        project.collaborators.remove(user_id)
        return Response({'status': 'collaborator removed'})

    def get_collaborators(self, request, pk):
        project = self.get_object()
        collaborators = project.collaborators.all()
        return Response({'collaborators': [collab.username for collab in collaborators]})
