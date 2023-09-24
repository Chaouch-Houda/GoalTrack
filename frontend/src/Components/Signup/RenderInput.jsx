import { Form } from "react-bootstrap";
import { Controller } from "react-hook-form";

const RenderInput = ({name,label, type, placeholder,inputClasses,control,errors, rules}) => {
    return ( //cette fct pour réduire la duplication de code
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field }) => ( //field : est un objet retourné par le composant Controller qui doit être utilisé pour lier le champ d'entrée (comme input, select, textarea, etc.) aux méthodes de gestion du formulaire fournies par useForm.Cela permet à RHF de gérer la mise à jour de la valeur du champ et la validation en fonction des règles spécifiées dans les rules.
            <div style={{position:"relative",width:"100%"}}>
                {
                // type === 'checkbox' ? (
                //     <Form.Check
                //         {...field}
                //         type={type}
                //         className="input-checkbox" // Add a custom class for the checkbox
                //     />
                //     ) : (
                    <Form.Group>
                        <Form.Label style={{display:{label} ? 'block' : 'none',width:'100%',textAlign:'start',paddingLeft:"0.7rem"}}>{label}</Form.Label>
                    <Form.Control 
                        {...field} 
                        type={type} 
                        placeholder={placeholder} 
                        className={inputClasses}
                        autoComplete="off"
                        data-lpignore="true"
                    />
                    </Form.Group>
                    // )
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