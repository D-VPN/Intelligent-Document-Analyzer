from django.urls import path
from .views import (
    projectCreate,
    extractKeys,
    getAllProjects,
    uploadForms,
    projectDelete,
    getProjectMetadata,
    getVisualizationData,
    exportData,
)

urlpatterns = [
    path("create-project/", projectCreate, name="create-project"),
    path("extract-keys/", extractKeys, name="extract-keys"),
    path("get-projects/", getAllProjects, name="get-projects"),
    path("upload-forms/", uploadForms, name="upload-forms"),
    path("delete-project/", projectDelete, name="delete-project"),
    path("project-dashboard/", getProjectMetadata, name="project-dahsboard"),
    path("visualization-data/", getVisualizationData, name="visualization-data"),
    path("export-data/", exportData, name="export-data"),
]
