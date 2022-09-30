function calcularEdad(){

    var hoy = new Date();
    var nacimiento = new Date('12/10/1990');

    var years = hoy.getFullYear() - nacimiento.getFullYear();

    if(hoy.getMonth() < nacimiento.getMonth()) {
        years--;
    }else if (nacimiento.getMonth() == 10)
        if (hoy.getDay() < nacimiento.getDay()) years--;

    document.getElementById('anios').innerHTML = years;

}

function currentYear()
{
    var year = new Date();
    document.getElementById('year').innerHTML = year.getFullYear();
}

$(document).ready(function() 
{
    calcularEdad();
    currentYear();
});