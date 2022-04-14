export const response = async ({ url, method, body }) => {

    const fecthApi = await fetch(
        url,
        {
            method: method,
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
            },
            body
        })
            
        return { 
            data: await fecthApi.json(),
            ok: fecthApi.ok
        }


}
