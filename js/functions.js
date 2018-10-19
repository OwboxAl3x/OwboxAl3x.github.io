function calcularEdad(){

    var hoy = new Date();
    var nacimiento = new Date('12/10/1990');

    var years = hoy.getFullYear() - nacimiento.getFullYear();

    if(hoy < nacimiento){

        years--;

    }

    document.getElementById('anios').innerHTML = years;

}