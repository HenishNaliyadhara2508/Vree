import { makeAutoObservable } from "mobx";

class VreeStore {
  frameMesh = null;
  lensesMesh = [];
  templeMesh = [];

  lensColor = "#ffffff";
  lensTransparency = 0;

  templeTexture = null;
  templeIntialTexture = null;
  templeColor = "#ffffff";
  templeMetalness = 0.1;
  templeRoughness = 0.2;
  templeTransparency = 0;

  frameTexture = null;
  frameIntialTexture = null;
  frameColor = "#ffffff";
  frameMetalness = 0.2;
  frameRoughness = 0.1;
  frameTransparency= 0;

  constructor() {
    makeAutoObservable(this);
  }
}

export const vreeStore = new VreeStore();