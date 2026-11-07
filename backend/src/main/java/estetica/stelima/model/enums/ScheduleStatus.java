package estetica.stelima.model.enums;

import java.util.Arrays;

public enum ScheduleStatus {
    AGENDADO,
    CANCELADO,
    CONCLUIDO;

    public static ScheduleStatus from(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return Arrays.stream(values())
                .filter(v -> v.name().equalsIgnoreCase(value))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Invalid financial status: " + value));
    }

    public static String toStringValue(ScheduleStatus scheduleStatus) {
        return scheduleStatus != null ? scheduleStatus.name() : null;
    }

}
