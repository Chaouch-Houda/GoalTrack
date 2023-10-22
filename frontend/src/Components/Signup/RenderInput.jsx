import { Form } from "react-bootstrap";
import { Controller } from "react-hook-form"; // il enveloppe un composant de formulaire standard (comme input, select, textarea, etc.)
//Controller se connecte avec le système de gestion de formulaire de react-hook-form, permettant ainsi d'effectuer des validations, de gérer les erreurs et de collecter les données du formulaire.
// on n'a plus besoin de useState et onChange pour suivre l'état et les changements de valeur des champs.
//Chaque champ que vous souhaitez inclure dans data doit être correctement enregistré avec Controller parce que Controller est un composant fourni par react-hook-form qui permet de lier un champ de formulaire à l'état géré par useForm.
const RenderInput = ({name,label, type, placeholder,defaultValue,inputClasses,control,errors, rules}) => {
    return ( //cette fct pour réduire la duplication de code
        <Controller
          name={name}
          control={control}
          rules={rules}
          defaultValue={defaultValue}
          render={({ field }) => ( //On utilise la fonction render de Controller pour définir comment le champ de formulaire doit être rendu dans votre interface utilisateur.field : est un objet retourné par le composant Controller qui doit être utilisé pour lier le champ d'entrée (comme input, select, textarea, etc.) aux méthodes de gestion du formulaire fournies par useForm.Cela permet à RHF de gérer la mise à jour de la valeur du champ et la validation en fonction des règles spécifiées dans les rules.
            <div style={{position:"relative",width:"100%"}}>
                {
                    <Form.Group>
                        <Form.Label style={{display: label ? 'block' : 'none',width:'100%',textAlign:'start',paddingLeft:"0.7rem"}}>{label}</Form.Label>
                    <Form.Control 
                        {...field} 
                        type={type} 
                        placeholder={placeholder} 
                        // defaultValue={defaultValue}
                        className={inputClasses}
                        // autoComplete="on"
                        data-lpignore="true"
                    />
                    </Form.Group>
                }
                {errors[name] &&
                    <Form.Text className="text-danger" style={{position:"absolute",left:"0",textAlign:"start",width:"100%",fontSize:"min(12px,4vw)"}}>
                        {errors[name].message}
                    </Form.Text>
                }
            </div>
          )}
        />
      );
}
export default RenderInput;