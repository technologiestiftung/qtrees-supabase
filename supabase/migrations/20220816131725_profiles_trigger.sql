SET check_function_bodies = OFF;

CREATE OR REPLACE FUNCTION public.authorizate (requested_permission app_permission, user_id uuid)
    RETURNS boolean
    LANGUAGE plpgsql
    SECURITY DEFINER
    AS $function$
DECLARE
    bind_permissions int;
BEGIN
    SELECT
        count(*)
    FROM
        public.permissions
        INNER JOIN public.user_roles ON role_permissions.role = user_roles.role
    WHERE
        role_permissions.permission = authorize.requested_permission
        AND user_roles.user_id = authorize.user_id INTO bind_permissions;
    RETURN bind_permissions > 0;
END;
$function$;

CREATE OR REPLACE FUNCTION public.handle_new_user ()
    RETURNS TRIGGER
    LANGUAGE plpgsql
    SECURITY DEFINER
    AS $function$
BEGIN
    INSERT INTO public.profiles (id)
        VALUES (NEW.id);
    -- select count(*) = 1
    -- from auth.users into is_admin;
    INSERT INTO public.user_roles (user_id, ROLE)
        VALUES (NEW.id, 'viewer');
    RETURN new;
END;
$function$;

-- trigger the function every time a user is created
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE PROCEDURE public.handle_new_user ();

