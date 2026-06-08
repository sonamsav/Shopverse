import dns from "dns";

dns.resolveSrv(
  "_mongodb._tcp.cluster0.o3wnfmf.mongodb.net",
  (err, records) => {
    console.log("ERROR:", err);
    console.log("RECORDS:", records);
  }
);