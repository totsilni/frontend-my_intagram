const timeAgo = () => {

    const gettime = (time)=>{
        const now =  Date.now();
        const SecondAgo  = Math.floor((now - time)/1000);
        if(SecondAgo < 60){
            return `${SecondAgo}s ago`;
        }else if(SecondAgo < 3600){
            const mintago = Math.floor((SecondAgo/60));
            return `${mintago}m ago`;
        }else if(SecondAgo < 86400){
            const hoursAgo = Math.floor((SecondAgo/3600));
            return `${hoursAgo}h ago`;
        }else if(SecondAgo < 604800){
            const dayAgo = Math.floor((SecondAgo/86400));
            return `${dayAgo}days ago`;
        }else{
            const weeksAgo = Math.floor((SecondAgo/604800));
            return `${weeksAgo}weeks ago`;
        }
    }

  return {gettime}
}

export default timeAgo
