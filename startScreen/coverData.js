var coverEvents = [
    {
    type: "typewriter",
    time: 2000,
    text: 'My new typewriter',
    div: "coverTitle",
    duration: 3000,
    color: "black",
    },
    {
    type: "greensock",	
    div: "coverTitle",
    time: 100,
    duration: 800,
    left: '0px'  
    }, 
    {
    type: "greensock",	
    div: "coverTitle",
    time: 5000,
    duration: 800,
    left: '100%'  
    }, 
    {
    type: "greensock",	
    div: "cover",
    time: 2100,
    duration: 2000,
    backgroundColor: "white",
    color: "red"   
    }, 
    {
    type: "greensock",	
    div: "coverSubtitle",
    time: 3000,
    duration: 500,
    color: 'blue',
    fontSize: '120px'
    }, 
    {
    type: "greensock",	
    div: "logo",
    time: 7000,
    duration: 1500,
    color: 'yellow',
    left: '100%',
    background: 'blue'
    }, 
    {
    type: "greensock",	
    div: "paper",
    time: 7000,
    duration: 1700,
    top: '-100%'
    }, 
    {
    type: "greensock",	
    div: "cover",
    time: 12000,
    duration: 2000,
    opacity: 0.01
    }, 
]


var coverDivs = [{ id: 'logo', innerHTML: 'Logo'}, { id: 'paper', innerHTML: 'Papier'}];