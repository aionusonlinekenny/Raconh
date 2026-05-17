class UiRadioButton extends RadioButton {
	public page:number;

	public constructor() {
		super();

		this.skinName = Manager.path.getSkinName("uiCommon", "uiRadioButtonSkin");
	}
}