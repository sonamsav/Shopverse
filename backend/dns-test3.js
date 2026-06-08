import dns from "dns";

dns.setServers(["8.8.8.8"]);

console.log("Servers:", dns.getServers());

dns.resolveSrv(
  "_mongodb._tcp.cluster0.o3wnfmf.mongodb.net",
  (err, records) => {
    console.log("ERROR:", err);
    console.log("RECORDS:", records);
  }
);