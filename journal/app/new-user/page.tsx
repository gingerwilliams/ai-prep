import { syncNewUser } from "@/utils/auth";

const NewUser = async () => {
    await syncNewUser()
    return <div>...loading</div>
}

export default NewUser;