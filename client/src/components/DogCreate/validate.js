const validate = (input) => {
    let errors = {};

    if(!/^[a-z ,A-Z.'-]+$/.test(input.name)){
        errors.name = 'Se requiere Nombre'
    }
    if(!input.height){
        errors.height = "se requiere altura min - max"
    }
    if(!/^\d{2} - \d{2}$/.test(input.height)){
        errors.height = "Formato 00 - 00"
    }
    if(!input.weight){
        errors.weight = "Se requiere peso min - max"
    }
    if(!/^\d{2} - \d{2}$/.test(input.weight)){
        errors.weight = "Formato 00 - 00"
    }
    if(!input.life_span){
        errors.life_span = "Se requiere edad min - max"
    }
    if(!/^\d{2} - \d{2}$/.test(input.life_span)){
        errors.life_span = "Formato 00 - 00"
    }
    if(!/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%+.~#?&/=]*)(?:\.[a-zA-Z]{2,})?(?:\?[^\s]*)?(?:#[^\s]*)?$/
    .test(input.image)) {
        errors.image = "Se requiere URL con HTTPS"
    }
    return errors;
  }
        
    

export default validate;