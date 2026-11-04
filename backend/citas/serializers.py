from django.utils import timezone
from rest_framework import serializers

from .models import (
    Especialidad, Medico, Paciente, EstadoCita, Cita, HistoriaClinica,
)


class EspecialidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Especialidad
        fields = "__all__"


class MedicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medico
        fields = "__all__"


class PacienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paciente
        fields = "__all__"


class EstadoCitaSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstadoCita
        fields = "__all__"


class CitaSerializer(serializers.ModelSerializer):
    paciente_nombre = serializers.CharField(source="paciente.nombres", read_only=True)
    medico_nombre = serializers.CharField(source="medico.nombres", read_only=True)
    especialidad = serializers.CharField(
        source="medico.especialidad.nombre", read_only=True
    )
    estado_nombre = serializers.CharField(source="estado.nombre", read_only=True)

    class Meta:
        model = Cita
        fields = [
            "id",
            "paciente",
            "medico",
            "fecha",
            "hora",
            "motivo",
            "estado",
            "paciente_nombre",
            "medico_nombre",
            "especialidad",
            "estado_nombre",
        ]

    def validate(self, attrs):
        fecha = attrs.get("fecha", getattr(self.instance, "fecha", None))
        hora = attrs.get("hora", getattr(self.instance, "hora", None))
        medico = attrs.get("medico", getattr(self.instance, "medico", None))

        if fecha is not None and fecha < timezone.now().date():
            raise serializers.ValidationError(
                {"fecha": "No se puede registrar una cita con fecha pasada."}
            )

        if medico is not None and fecha is not None and hora is not None:
            qs = Cita.objects.filter(medico=medico, fecha=fecha, hora=hora)
            if self.instance is not None:
                qs = qs.exclude(pk=self.instance.pk)
            if qs.exists():
                raise serializers.ValidationError(
                    {"hora": "El medico ya tiene una cita en ese horario."}
                )
        return attrs


class HistoriaClinicaSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoriaClinica
        fields = "__all__"