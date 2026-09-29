from datetime import date

from rest_framework import serializers

from .models import Carros

ANO_MINIMO = 1900


class CarrosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carros
        fields = '__all__'

    def validate_ano_fabricacao(self, value):
        return self._validar_ano(value)

    def validate_ano_modelo(self, value):
        return self._validar_ano(value, margem=1)

    def validate(self, attrs):
        ano_fabricacao = attrs.get('ano_fabricacao', getattr(self.instance, 'ano_fabricacao', None))
        ano_modelo = attrs.get('ano_modelo', getattr(self.instance, 'ano_modelo', None))
        if ano_fabricacao and ano_modelo and not ano_fabricacao <= ano_modelo <= ano_fabricacao + 1:
            raise serializers.ValidationError(
                {'ano_modelo': 'O ano do modelo deve ser igual ao ano de fabricação ou o seguinte.'}
            )
        return attrs

    def _validar_ano(self, value, margem=0):
        ano_maximo = date.today().year + margem
        if not ANO_MINIMO <= value <= ano_maximo:
            raise serializers.ValidationError(f'Informe um ano entre {ANO_MINIMO} e {ano_maximo}.')
        return value
