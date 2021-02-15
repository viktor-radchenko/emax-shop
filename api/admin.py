from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from api.models import CustomUser


class CustomAdminConfig(UserAdmin):
    ordering = ("-created_at",)
    list_display = (
        "email",
        "username",
        "first_name",
        "is_active",
        "is_staff",
        "is_superuser",
    )
    search_fields = ("email", "username", "first_name")
    list_filter = ("email", "username", "is_staff")

    # edit/manage form fields
    fieldsets = (
        (None, {"fields": ("email", "username", "first_name")}),
        ("Permissions", {"fields": ("is_active", "is_staff", "is_superuser")}),
        ("Personal", {"fields": ("about",)}),
    )

    # add new user form fields
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "username",
                    "first_name",
                    "password1",
                    "password2",
                    "is_active",
                    "is_staff",
                    "is_superuser",
                ),
            },
        ),
    )


admin.site.register(CustomUser, CustomAdminConfig)
