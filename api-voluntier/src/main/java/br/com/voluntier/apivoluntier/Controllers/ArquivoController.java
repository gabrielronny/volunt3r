package br.com.voluntier.apivoluntier.Controllers;

import br.com.voluntier.apivoluntier.Models.*;
import br.com.voluntier.apivoluntier.Repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Formatter;
import java.util.FormatterClosedException;
import java.util.List;

@RestController
@RequestMapping("/downloads")
public class ArquivoController {

    @Autowired
    EventoRepository repositoryEvento;
    CategoriaRepository repositoryCategoria;
    CliqueRepository repositoryClique;
    GosteiRepository repositoryGostei;
    PublicacaoRepository repositoryPublicacao;
    UsuarioRepository repositoryUsuario;

    public static void gravaRegistro(String nomeArq, String registro) {
        BufferedWriter saida = null;
        try {
            saida = new BufferedWriter(new FileWriter(nomeArq, true));
        } catch (IOException e) {
            System.err.printf("Erro na abertura do arquivo: %s.\n", e.getMessage());
        }

        try {
            saida.append(registro + "\n");
            saida.close();

        } catch (IOException e) {
            System.err.printf("Erro ao gravar arquivo: %s.\n", e.getMessage());
        }
    }

    @GetMapping(value = "/arquivo-eventos", produces = "application/txt")
    @ResponseBody
    public ResponseEntity getDocumentoEventos() {
//        List<Evento> retornoRepositoryEvento = repositoryEvento.findAll();

        String nomeArq = "Arquivo-Eventos.txt";
        String header = "";
        String corpo = "";
        String trailer = "";
        int contRegDados = 0;
        boolean fim = false;
        String idEvento = "61", nomeEvento = "Doação de sangue", categoria = "N2", dataAbertura= "21-02-2020", dataFechamento= "28-02-2020";
        double aderencia = 64.8;
        int numeroParticipantes = 30, horas = 8, cliques = 50, likes= 25;

        // Monta o registro header
        Date dataDeHoje = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");

        header += "00EVENTO20211";
        header += formatter.format(dataDeHoje);
        //Versão do Layout
        header += "01";

        // Grava o registro header
        gravaRegistro(nomeArq, header);

//        while (!fim) {
//            System.out.println("\n" +
//                    "1.\tAdicionar um evento\n" +
//                    "2.\tSair\n"
//            );
//
//            int opcao = leitor.nextInt();
//
//            switch (opcao) {
//                case 1:
//                    System.out.println("Digite o id:");
//                    idEvento = leitor.next();
//
//                    System.out.println("Digite o nome:");
//                    nomeEvento = leitorNL.nextLine();
//
//                    System.out.println("Digite a categoria:");
//                    categoria = leitorNL.nextLine();
//
//                    System.out.println("Digite o número de participantes:");
//                    numeroParticipantes = leitor.nextInt();
//
//                    System.out.println("Digite as horas do evento:");
//                    horas = leitor.nextInt();
//
//                    System.out.println("Digite a aderência que o evento teve:");
//                    aderencia = leitor.nextDouble();
//
//                    System.out.println("Digite a data de abertura (dia-mes-ano):");
//                    dataAbertura = leitor.next();
//
//                    System.out.println("Digite a data de fechamento (dia-mes-ano):");
//                    dataFechamento = leitor.next();
//
//                    System.out.println("Digite quantos cliques o evento teve:");
//                    cliques = leitor.nextInt();
//
//                    System.out.println("Digite quantos likes o evento teve:");
//                    likes = leitor.nextInt();

        corpo = "02";

        corpo += String.format("%-4s", idEvento);
        corpo += String.format("%-50s", nomeEvento);
        corpo += String.format("%-2s", categoria);
        corpo += String.format("%4s", numeroParticipantes);
        corpo += String.format("%4s", horas);
        corpo += String.format("%5s", aderencia);
        corpo += String.format("%-10s", dataAbertura);
        corpo += String.format("%-10s", dataFechamento);
        corpo += String.format("%4s", cliques);
        corpo += String.format("%4s", likes);

        contRegDados++;

        gravaRegistro(nomeArq, corpo);
//                    break;
//
//                case 2:
//                    fim = true;
        // monta o trailer
        trailer += "01";
        trailer += String.format("%010d", contRegDados);
        gravaRegistro(nomeArq, trailer);
//                    System.out.println("Programa encerrado");
//                    break;

//                default:
//                    System.out.println("Opção inválida!");
//                    break;
//            }
        System.out.println(idEvento);
        System.out.println(nomeEvento);
        System.out.println(categoria);

        HttpHeaders headers = new HttpHeaders();

        headers.add("Content-Disposition", "attachment; filename=Arquivo-Eventos.txt");

        return ResponseEntity.status(200).headers(headers).build();
    }

////--------------------------------------------------------------------------------------------------------------------//
//
//    @GetMapping(value = "/eventos-csv", produces = "application/csv")
//    @ResponseBody
//    public ResponseEntity getEventoCSV() {
//        List<Evento> retornoRepositoryEvento = repositoryEvento.findAll();
//
//        FileWriter arq = null;        // objeto FileWriter - representa o arquivo
//        Formatter saida = null;        // objeto Formatter para executar saída formatada
//        boolean deuRuim = false;    // indica se deu erro
//
//        String nomeArquivo = "Eventos.csv";
//
//        try {
//            arq = new FileWriter(nomeArquivo, true);  // true indica que vai fazer "append"
//            saida = new Formatter(arq);
//        } catch (IOException erro) {
//            System.err.println("Erro ao abrir arquivo");
//            System.exit(1);  // encerra o programa, com status de erro
//        }
//
//        try {
//            for (int i = 0; i < retornoRepositoryEvento.size() - 1; i++) {
//                List<Categoria> retornoRepositoryCategoria = repositoryCategoria.findById(retornoRepositoryEvento.get(i).getIdCategoria());
//                List<Publicacao> retornoRepositoryPublicacao = repositoryPublicacao.findByEvento(retornoRepositoryEvento.get(i).getId());
//                int cliques = repositoryClique.countByPublicacaoId(retornoRepositoryPublicacao.get(i).getId());
//                int likes = repositoryGostei.countByPublicacaoId(retornoRepositoryPublicacao.get(i).getId());
//
//                saida.format("%d;%s;%s;%d;%.1f;%d;%d;%n",
//                        retornoRepositoryEvento.get(i).getId(),
//                        retornoRepositoryEvento.get(i).getDataEvento(),
//                        retornoRepositoryCategoria.get(i).getDescricao(),
//                        retornoRepositoryEvento.get(i).getMaximoParticipantes(),
//                        retornoRepositoryEvento.get(i).getHoras(),
//                        cliques,
//                        likes
//                );
//            }
//        } catch (FormatterClosedException erro) {
//            System.err.println("Erro ao gravar no arquivo");
//            deuRuim = true;
//        } finally { // bloco finally é executado independente de dar erro ou não
//            // usado para fechar os objetos saida e close.
//            saida.close();
//            try {
//                arq.close();
//            } catch (IOException erro) {
//                System.err.println("Erro ao fechar arquivo.");
//                deuRuim = true;
//            }
//            if (deuRuim) {
//                System.exit(1);
//            }
//        }
//
//        HttpHeaders headers = new HttpHeaders();
//
//        headers.add("Content-Disposition", "attachment; filename=Eventos.csv");
//
//        return ResponseEntity.status(200).headers(headers).build();
//    }

//    //----------------------------------------------------------------------------------------------------------------//
//    @GetMapping(value = "/arquivo-funcionarios", produces = "application/txt")
//    @ResponseBody
//    public ResponseEntity getDocumentoFuncionario() {
//        List<Usuario> retornoRepositoryFuncionario = repositoryUsuario.findAll();
//
//        String nomeArq = "Arquivo-Funcionarios.txt";
//        String header = "";
//        String corpo = "";
//        String trailer = "";
//        int contRegDados = 0;
//        boolean fim = false;
//
//        // Monta o registro header
//        Date dataDeHoje = new Date();
//        SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
//
//        header += "00FUNCIONARIO20211";
//        header += formatter.format(dataDeHoje);
//        //Versão do Layout
//        header += "01";
//
//        // Grava o registro header
//        gravaRegistro(nomeArq, header);
//
//        for (int i = 0; i <= retornoRepositoryFuncionario.size() - 1; i++) {
//
//
//            corpo = "02";
//
//            corpo += String.format("%-4s", retornoRepositoryFuncionario.get(i).getIdUsuario());
//            corpo += String.format("%-50s", retornoRepositoryFuncionario.get(i).getNomeUsuario());
//            corpo += String.format("%-30s", retornoRepositoryFuncionario.get(i).getCargo());
//            corpo += String.format("%-30s", retornoRepositoryFuncionario.get(i).getArea());
//            corpo += String.format("%-30s", retornoRepositoryFuncionario.get(i).getEmail());
//
//            contRegDados++;
//
//            gravaRegistro(nomeArq, corpo);
//
//            // monta o trailer
//            trailer += "01";
//            trailer += String.format("%010d", contRegDados);
//            gravaRegistro(nomeArq, trailer);
//        }
//
//        HttpHeaders headers = new HttpHeaders();
//
//        headers.add("Content-Disposition", "attachment; filename=Arquivo-Funcionarios.txt");
//
//        return ResponseEntity.status(200).headers(headers).build();
//    }
//
//    //----------------------------------------------------------------------------------------------------------------//
//    @GetMapping(value = "/funcionarios-csv", produces = "application/csv")
//    @ResponseBody
//    public ResponseEntity getFuncionarioCSV() {
//        List<Usuario> retornoRepositoryFuncionario = repositoryUsuario.findAll();
//
//        FileWriter arq = null;        // objeto FileWriter - representa o arquivo
//        Formatter saida = null;        // objeto Formatter para executar saída formatada
//        boolean deuRuim = false;    // indica se deu erro
//
//        String nomeArquivo = "Funcionarios.csv";
//
//        try {
//            arq = new FileWriter(nomeArquivo, true);  // true indica que vai fazer "append"
//            saida = new Formatter(arq);
//        } catch (IOException erro) {
//            System.err.println("Erro ao abrir arquivo");
//            System.exit(1);  // encerra o programa, com status de erro
//        }
//
//        try {
//            for (int i = 0; i < retornoRepositoryFuncionario.size() - 1; i++) {
//
//                saida.format("%d;%s;%s;%s;%s;%n",
//                        retornoRepositoryFuncionario.get(i).getIdUsuario(),
//                        retornoRepositoryFuncionario.get(i).getNomeUsuario(),
//                        retornoRepositoryFuncionario.get(i).getCargo(),
//                        retornoRepositoryFuncionario.get(i).getArea(),
//                        retornoRepositoryFuncionario.get(i).getEmail()
//                );
//            }
//        } catch (FormatterClosedException erro) {
//            System.err.println("Erro ao gravar no arquivo");
//            deuRuim = true;
//        } finally { // bloco finally é executado independente de dar erro ou não
//            // usado para fechar os objetos saida e close.
//            saida.close();
//            try {
//                arq.close();
//            } catch (IOException erro) {
//                System.err.println("Erro ao fechar arquivo.");
//                deuRuim = true;
//            }
//            if (deuRuim) {
//                System.exit(1);
//            }
//        }
//
//        HttpHeaders headers = new HttpHeaders();
//
//        headers.add("Content-Disposition", "attachment; filename=Funcionarios.csv");
//
//        return ResponseEntity.status(200).headers(headers).build();
//    }
}
