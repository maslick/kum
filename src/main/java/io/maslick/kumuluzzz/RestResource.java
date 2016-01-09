package io.maslick.kumuluzzz;


import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.HashMap;
import java.util.Map;



@Path("/rest")
@Produces(MediaType.APPLICATION_JSON)
public class RestResource {

    @GET
    public Response getResources() {

        Map<String, String> json = new HashMap<String, String>();
        json.put("framework", "KumuluzEE");

        return Response.ok(json).build();
    }
}