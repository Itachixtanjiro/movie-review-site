import {useSelector} from "react-redux";
import React from "react";
function Home() {
  const {user} = useSelector((state)=>state.users);
    return(
        <div>
          <h1 className="text-2xl font-semibold text-grey-600">
            welcome {user?.name}
          </h1>
        </div>

    );
}
export default Home;