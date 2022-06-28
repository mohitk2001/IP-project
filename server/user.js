const users=[];
const addUser=({id,name,room})=>{
    name=name.toLowerCase();
    room=room.toLowerCase();
    const existUser=users.find((user)=>user.room==room && user.name==name);

    if(existUser){
        return {error:"Username is taken "}
    }

    const user={id,name,room};

    users.push(user);
    return {users};
}
const getUser=(room)=>{
    return users.filter((user)=>user.room===room);
}
const getUserByID=(id)=>{
    let answer=""
  users.map((user)=>{
      if(user.id===id){
        answer=user;
      }
  })
  return answer;
}
const leftUser=(id)=>{
    const findIndex=users.findIndex((user)=>user.id===id);
    if(findIndex !== -1) return users.splice(findIndex, 1)[0];
}

module.exports={addUser,getUser,leftUser,getUserByID}