from django.db import models

class Media(models.Model):
    TYPE_CHOICES = [
        ('photo', 'Photo'),
        ('video', 'Video'),
    ]
    
    type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    url = models.URLField()
    caption = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = 'Media'
    
    def __str__(self):
        return self.caption