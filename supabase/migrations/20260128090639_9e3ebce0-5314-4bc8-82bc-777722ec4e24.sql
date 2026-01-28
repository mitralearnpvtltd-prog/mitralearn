-- Add new permissions for Super Admin specific actions
INSERT INTO permissions (key, description) VALUES
('referral.manage', 'Manage referral system settings'),
('analytics.manage', 'Enable/disable analytics features'),
('candidate.delete', 'Delete candidate data')
ON CONFLICT (key) DO NOTHING;

-- Get the SuperAdmin role_id and new permission_ids to link them
DO $$
DECLARE
    super_admin_role_id uuid;
    perm_id uuid;
BEGIN
    -- Get SuperAdmin role_id
    SELECT role_id INTO super_admin_role_id FROM roles WHERE role_name = 'SuperAdmin';
    
    -- Add referral.manage permission to SuperAdmin
    SELECT permission_id INTO perm_id FROM permissions WHERE key = 'referral.manage';
    IF perm_id IS NOT NULL AND super_admin_role_id IS NOT NULL THEN
        INSERT INTO role_permissions (role_id, permission_id) 
        VALUES (super_admin_role_id, perm_id)
        ON CONFLICT DO NOTHING;
    END IF;
    
    -- Add analytics.manage permission to SuperAdmin
    SELECT permission_id INTO perm_id FROM permissions WHERE key = 'analytics.manage';
    IF perm_id IS NOT NULL AND super_admin_role_id IS NOT NULL THEN
        INSERT INTO role_permissions (role_id, permission_id) 
        VALUES (super_admin_role_id, perm_id)
        ON CONFLICT DO NOTHING;
    END IF;
    
    -- Add candidate.delete permission to SuperAdmin
    SELECT permission_id INTO perm_id FROM permissions WHERE key = 'candidate.delete';
    IF perm_id IS NOT NULL AND super_admin_role_id IS NOT NULL THEN
        INSERT INTO role_permissions (role_id, permission_id) 
        VALUES (super_admin_role_id, perm_id)
        ON CONFLICT DO NOTHING;
    END IF;
END $$;