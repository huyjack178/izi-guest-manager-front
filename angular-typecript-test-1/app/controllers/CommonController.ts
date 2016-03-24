module Application.Controllers {
    export class CommonController {
        public static showContent(content: string) {
            jQuery(content).show();
        }

        public static hideContent(content: string) {
            jQuery(content).hide();
        }

        public static showPreloader() {
            jQuery('.preloader').show();
        }

        public static hidePreloader() {
            jQuery('.preloader').hide();
        }

        public static initModals = () => {
            $('.modal-trigger').leanModal({
                dismissible: true,
                complete: function () {
                    $('.deleteId').val('');
                } // Callback for Modal close
            });
        }
    }

    angular.module("Application")
        .controller("Application.Controllers.CommonController", CommonController);
}