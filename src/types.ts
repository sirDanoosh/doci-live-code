export interface ISlider {
  id: number;
  imageUrl: string;
  smallImageUrl: string;
  mediumImageUrl: string;
  logoImageUrl: string;
  type: string;
  buttonTitle: string | null;
  link: string | null;
  entityId: number | null;
  entityType: string | null;
}

export type ISliderDTO = { sliders: Array<ISlider> };
