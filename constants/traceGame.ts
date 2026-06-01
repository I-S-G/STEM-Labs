import { Dimensions } from "react-native";

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get("window");

export const SCREEN_WIDTH = SCREEN_W;
export const SCREEN_HEIGHT = SCREEN_H;

export const GAME_DURATION = 15; // seconds
export const CIRCLE_RADIUS = 32; // px
export const HIT_RADIUS = CIRCLE_RADIUS + 16; // finger tolerance
export const TICK_MS = 16; // ~60fps
export const SPEED_START = 1.2; // px per tick
export const SPEED_END = 3.0; // px per tick at game end
export const BOUNCE_PADDING = CIRCLE_RADIUS + 28;
export const TRAIL_LENGTH = 50; // number of positions kept for trail

export const TOP_BOUND = SCREEN_H * 0.2;
export const BOTTOM_BOUND = SCREEN_H * 0.88;
