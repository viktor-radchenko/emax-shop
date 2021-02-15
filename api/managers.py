from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import ugettext_lazy as _


class CustomAccountManager(BaseUserManager):

    def create_user(self, email, username, first_name, password, **other_fields):

        if not email:
            raise ValueError(_("You must provide an email address"))

        email = self.normalize_email(email)
        user = self.model(email=email, username=username, first_name=first_name, **other_fields)

        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, email, username, first_name, password, **other_fields):
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if not other_fields.get('is_staff'):
            raise ValueError("Super User must be assigned to is_staff=True")

        if not other_fields.get('is_superuser'):
            raise ValueError("Super User must be assigned to is_superuser=True")

        if not other_fields.get('is_active'):
            raise ValueError("Super User must be assigned to is_active=True")

        return self.create_user(email, username, first_name, password, **other_fields)
