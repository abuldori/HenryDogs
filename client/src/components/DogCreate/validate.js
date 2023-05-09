const validate = (input) => {
    let errors = {}; 

    if(input.name && !/^[a-z ,A-Z.'-]+$/.test(input.name)){
        errors.name = 'Se requiere Nombre'
    }
    if (input.height && !/^\d{1,3}(\.\d{1,3})?$/.test(input.height)) {
        errors.height = "Dato obligatorio";
        //"El formato debe ser: 00 - 00 o 0 - 0 o 00,0 - 00,0 o 0,0 - 0,0";
      }
      
      if (input.weight && !/^\d{1,2}(,\d{1})?(\.\d{1,3})?$/.test(input.weight)) {
        errors.weight =  "Dato obligatorio";
      }
  
    if(input.life_span && !/^\d{1,2}(\.\d)?\s*(y|años)?\s*-\s*\d{1,2}(\.\d)?\s*(y|años)?$/.test(input.life_span)){
        errors.life_span = "Edad min - max";
    }
    
      // Validar la URL de imagen
      if (input.image && !(/^https?:\/\/(?:[a-z0-9-]+\.)+[a-z]{2,}(?:\/[^/]+)*\/?(?:\?.*)?$/i.test(input.image))) {
        errors.image = "*";
      }

    return errors;
  }
        
    

export default validate;