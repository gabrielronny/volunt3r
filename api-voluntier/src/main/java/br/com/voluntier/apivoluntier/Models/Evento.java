package br.com.voluntier.apivoluntier.Models;

import javax.persistence.*;
import java.util.List;

@Entity
public class Evento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idEvento")
    private Integer id;
    private String dataEvento;
    private int maximoParticipantes;
    private double horas;
    @Column(name = "fkCategoria")
    private int idCategoria;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDataEvento() {
        return dataEvento;
    }

    public void setDataEvento(String dataEvento) {
        this.dataEvento = dataEvento;
    }

    public int getMaximoParticipantes() {
        return maximoParticipantes;
    }

    public void setMaximoParticipantes(int maximoParticipantes) {
        this.maximoParticipantes = maximoParticipantes;
    }

    public double getHoras() {
        return horas;
    }

    public void setHoras(double horas) {
        this.horas = horas;
    }

    public int getIdCategoria() {
        return idCategoria;
    }

    public void setIdCategoria(int idCategoria) {
        this.idCategoria = idCategoria;
    }
}



