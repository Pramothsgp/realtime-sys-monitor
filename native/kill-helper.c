#include <stdlib.h>
#include <stdio.h>
#include <signal.h>
#include <unistd.h>
#include <errno.h>
#include <string.h>

int main(int argc, char *argv[]) {
    FILE *log = fopen("/tmp/kill-helper.log", "a+");
    if (!log) return 1;

    fprintf(log, "[%s] Invoked with %d arguments\n", __TIME__, argc);
    if (argc != 2) {
        fprintf(log, "Usage error: Expected 1 argument\n");
        fclose(log);
        return 1;
    }

    int pid = atoi(argv[1]);
    fprintf(log, "Attempting to kill PID: %d\n", pid);

    if (kill(pid, SIGKILL) == 0) {
        fprintf(log, "Successfully killed process %d\n", pid);
    } else {
        fprintf(log, "Error killing process: %s\n", strerror(errno));
    }

    fclose(log);
    return 0;
}
