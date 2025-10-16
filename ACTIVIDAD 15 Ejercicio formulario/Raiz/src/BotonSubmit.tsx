interface botonSubmitProps{
    texto:string;
    onclick?:(e:React.FormEvent)=>void;
}
export function BotonSubmit({texto,onclick}:botonSubmitProps){
    return(
        <button type="submit" onClick={onclick}>{texto}</button>
    )
}