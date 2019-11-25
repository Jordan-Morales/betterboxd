/////////////////////////////////
//To include in HTML
//<div ng-include="'includes/profile.html'"></div>
/////////////////////////////////


this.profileOn = false

this.showProfile () => {
  controller.profileOn = !controller.profileOn;
}
