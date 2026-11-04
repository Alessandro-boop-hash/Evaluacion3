from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    EspecialidadViewSet, MedicoViewSet, PacienteViewSet, EstadoCitaViewSet,
    CitaViewSet, HistoriaClinicaViewSet,
)

router = DefaultRouter()
router.register(r"especialidades", EspecialidadViewSet)
router.register(r"medicos", MedicoViewSet)
router.register(r"pacientes", PacienteViewSet)
router.register(r"estados", EstadoCitaViewSet)
router.register(r"citas", CitaViewSet)
router.register(r"historias", HistoriaClinicaViewSet)

urlpatterns = [
    path("", include(router.urls)),
]