const Card = ({img, bg}) =>{
    return(
        <div className={`w-64 ${bg}`}>
            <img src="{img}" alt="orchard " className="w-96  " />
        </div>
        
    )
}
