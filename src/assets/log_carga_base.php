<?php

$Datos = json_decode(file_get_contents("php://input"));

print_r($Datos);

    // creas el fichero con la API File
    $fecha_hora =  date('d-m-Y H:i:s');
    $event = "200";
    $archivo = "log_carga_base.txt";
    $usuario_log = "CrmDynScribe Integración";
    $obj = "'CrmDynScribe Integración', 'Inbound','Preparatoria', 'mgarcia','', 'mgarcia','','EX ALUMNOS2','1',null,'http://localhost:4200/register','Preparatoria', 'CUITLAHUAC','','Inbound','LICENCIATURA EN NUTRICION', '19-1', 'mgarcia@gmail.com', '','22', null, 'INBOUND', '0078a78d-86fc-e311-b5a9-005056be4250', '2f3bdab0-5c72-e211-a4c9-6cae8b2a0430', null, '64bed5d6-404f-e811-8113-3863bb3c5058', '868a7ec1-493b-e711-a51f-0050568d5ea9', '6fa95596-16ef-e611-a5d4-005056be4250', '2e89dd13-6072-e211-b35f-6cae8b2a4ddc', '48462c75-6a72-e211-a7b5-3440b5bef8e4', '643d9468-6172-e211-a7b5-3440b5bef8e4', 'd6d4012d-8aaf-e711-8104-c4346bdc0341', 'Masculino', '', '', 'PRESENCIAL', 'LICENCIATURA', 'mgarcia', '', null, null, '', '5', 'WEBSLD', '5542510302', '5542510302', '95542510302', 'mgarcia@gmail.com', '90445542510302', null, 'PROSPECTO CICLO 19-3', 'CrmDynScribe Integración', 'INBOUND'";
    $cadena = " " . $fecha_hora . ": " . $usuario_log . " = ".$event.": {" . $obj . "}";




if(file_exists($archivo)){
 /**En caso de existir el archivo escribe */
$file = fopen($archivo, "a");
fwrite($file, $cadena . PHP_EOL);
fclose($file);
/*termina la escritura del archivo existente*/
}else{
/*En caso de no existir el archivo*/
echo "no esta creado";
$file = fopen($archivo, "w");
fwrite($file, $cadena . PHP_EOL);
fclose($file);
/**Termina la creacion y escritura del nuevo archivo */
}


?>
