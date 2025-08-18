import tcpPortUsed from "tcp-port-used";
import find from "find-process";
import fkill from "fkill";

export async function checkAndKill(port: number) {
  const inUse = await tcpPortUsed.check(port, "127.0.0.1");

  if (inUse) {
    console.log(` Port ${port} is in use, finding process...`);
    const list = await find("port", port);

    if (list.length > 0) {
      const { pid, name } = list[0];
      console.log(` Port ${port} used by PID ${pid} (${name}), killing...`);
      await fkill(pid);
      console.log(` Killed process PID ${pid}`);
    } else {
      console.log(` No process found using port ${port}`);
    }
  } else {
    console.log(` Port ${port} is free`);
  }
}
