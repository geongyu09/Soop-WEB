"use client";

// import { useDrawPath } from "@/hooks/feature/map/useDrawPath";
import useGetCurrentPositionBridge, {
  Position,
} from "@hooks/feature/bridge/useGetCurrentPositionBridge";
import useLogBridge from "@hooks/feature/bridge/useLogBridge";
import { useNaverMap } from "@hooks/feature/map/useNaverMap";
import { useSetMarker } from "@hooks/feature/map/useSetMarker";
import { useEffect, useState } from "react";

// CHECK: 여기 수정
// const path = [
// [35.1228655, 126.9969293],
// [35.1226374, 126.9969293],
// [35.1219178, 126.9971009],
// [35.1213211, 126.997337],
// [35.1206366, 126.9980451],
// [35.1198468, 126.9985601],
// [35.1190394, 126.9989034],
// [35.1185128, 126.9993325],
// [35.1176879, 127.0000621],
// [35.1176528, 127.000105],
// [35.122497, 126.9986244],
// [35.1227778, 126.9990751],
// [35.1229045, 126.9991763],
// [35.1229418, 126.999238],
// [35.1226895, 126.9995914],
// [35.1224262, 127.0002968],
// [35.1222068, 127.0007139],
// [35.1223275, 127.0004919],
// ];

const defaultPosition = { latitude: 35.1228655, longitude: 126.9969293 };

export default function MapWithCurrentPositionMark() {
  // const { currentPosition } = useGetCurrentPosition();
  const [currentPosition, setCurrentPosition] = useState<{
    latitude: number;
    longitude: number;
  }>(defaultPosition);

  const getCurrentPosition = useGetCurrentPositionBridge();

  const onResponse = ({ coords }: Position) => {
    try {
      const { latitude, longitude } = coords;
      setCurrentPosition({ latitude, longitude });
      return { latitude, longitude };
    } catch (error) {
      console.error("Error in getCurrentPosition:", error);
      return null;
    }
  };

  useEffect(() => {
    getCurrentPosition(onResponse);
  }, []);

  const { mapId, map } = useNaverMap(currentPosition);
  const logBridge = useLogBridge();

  // useDrawPath(map, path as [number, number][]);

  useSetMarker(map, currentPosition ?? defaultPosition);
  logBridge(currentPosition);

  return <div id={mapId} className="h-screen w-screen" />;
}
