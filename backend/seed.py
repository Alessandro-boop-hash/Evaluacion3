import django, os
os.environ.setdefault("DJANGO_SETTINGS_MODULE","clinica.settings")
django.setup()
from citas.models import Especialidad, Medico, Paciente, EstadoCita, Cita
from datetime import date, time

esps = ["Cardiologia","Pediatria","Dermatologia"]
for n in esps:
    Especialidad.objects.get_or_create(nombre=n, defaults={"descripcion": f"Especialidad de {n}"})

estados = [("pendiente",False),("confirmada",False),("atendida",True),("cancelada",True)]
for n,final in estados:
    EstadoCita.objects.get_or_create(nombre=n, defaults={"es_final":final})

medicos_data = [
    ("Dr. Juan Perez","CMP001","Cardiologia","999111222","jperez@clinica.com"),
    ("Dra. Maria Lopez","CMP002","Pediatria","999333444","mlopez@clinica.com"),
    ("Dr. Carlos Ruiz","CMP003","Dermatologia","999555666","cruiz@clinica.com"),
    ("Dra. Ana Torres","CMP004","Cardiologia","999777888","atorres@clinica.com"),
]
for nom,cmp,esp,tel,cor in medicos_data:
    Medico.objects.get_or_create(cmp=cmp, defaults={
        "nombres":nom,"especialidad":Especialidad.objects.get(nombre=esp),
        "telefono":tel,"correo":cor})

pacientes_data = [
    ("12345678","Luis Gomez",date(1990,5,10),"987654321","lgomez@mail.com"),
    ("87654321","Rosa Diaz",date(1985,3,22),"912345678","rdiaz@mail.com"),
    ("11223344","Pedro Flores",date(2000,1,15),"923456789","pflores@mail.com"),
    ("44332211","Carmen Vega",date(1978,11,30),"934567890","cvega@mail.com"),
    ("55667788","Jose Rios",date(1995,7,8),"945678901","jrios@mail.com"),
]
for dni,nom,fn,tel,cor in pacientes_data:
    Paciente.objects.get_or_create(dni=dni, defaults={
        "nombres":nom,"fecha_nacimiento":fn,"telefono":tel,"correo":cor})

print("seed done")
print("especialidades:", Especialidad.objects.count())
print("medicos:", Medico.objects.count())
print("pacientes:", Paciente.objects.count())
print("estados:", EstadoCita.objects.count())
