package io.maslick.kumuluzzz;

import io.maslick.kumuluzzz.model.IOC;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.persistence.PersistenceContext;


@Path("/")
@Produces(MediaType.APPLICATION_JSON)
public class RestResource {

    @PersistenceContext(unitName = "ioc")
    private EntityManager em;

    @GET
    public Response getResources() {

        Map<String, String> json = new HashMap<String, String>();
        json.put("framework", "KumuluzEE");

        return Response.ok(json).build();
    }

    @GET
    @Path("/iocs")
    public Response listIOCs() {
        TypedQuery<IOC> query  = em.createNamedQuery("IOC.findAll", IOC.class);
        List<IOC> iocs = query.getResultList();
        return Response
                .status(Response.Status.OK)
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
                .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD")
                .header("Access-Control-Max-Age", "1209600")
                .entity(iocs)
                .build();
    }

    @POST
    @Path("/add")
    public Response createIOC(IOC ioc) {
        ioc.setId(null);
        em.getTransaction().begin();
        em.persist(ioc);
        em.getTransaction().commit();

        return Response
                .status(Response.Status.CREATED)
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
                .header("Access-Control-Allow-Credentials", "true")
                .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD")
                .header("Access-Control-Max-Age", "1209600")
                .entity(ioc)
                .build();
    }

    @DELETE
    @Path("/delete/{id}")
    public Response deleteIOC(@PathParam("id")Integer id) {
        IOC ioc = em.find(IOC.class, id);
        em.getTransaction().begin();
        em.remove(ioc);
        em.getTransaction().commit();
        return Response
                .status(Response.Status.OK)
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
                .header("Access-Control-Allow-Credentials", "true")
                .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD")
                .header("Access-Control-Max-Age", "1209600")
                .build();
    }
}