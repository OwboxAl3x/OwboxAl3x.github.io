function calcularEdad(){

    var hoy = new Date();
    var nacimiento = new Date('12/10/1990');

    var years = hoy.getFullYear() - nacimiento.getFullYear();

    if(hoy.getMonth() < nacimiento.getMonth() && hoy.getDay() < nacimiento.getDay()){

        years--;

    }

    document.getElementById('anios').innerHTML = years;

}